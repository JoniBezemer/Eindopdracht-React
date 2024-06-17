import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Image, Button, Input, Textarea, Flex } from '@chakra-ui/react';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [categoryNames, setCategoryNames] = useState('');

  useEffect(() => {
    // Fetch event
    fetch(`http://localhost:3000/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setCategoryNames(data.categoryIds ? getCategoryNames(data.categoryIds) : "");
        
        // Fetch the createdBy user data
        if (data.createdBy) {
          fetch(`http://localhost:3000/users/${data.createdBy}`)
            .then((response) => response.json())
            .then((userData) => setCreatedBy(userData))
            .catch((error) => console.error("Error fetching createdBy user:", error));
        }
      })
      .catch((error) => console.error("Error fetching event:", error));

    // Fetch categories
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      title,
      description,
      image,
      startTime,
      endTime,
      categories: categoryNames.split(",").map((cat) => cat.trim()),
    };

    fetch(`http://localhost:3000/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating event:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error deleting event:", error));
  };

  const getCategoryNames = (categoryIds) => {
    return categoryIds.map(id => {
      const category = categories.find(cat => cat.id === id);
      return category ? category.name : "Onbekend";
    }).join(", ");
  };

  if (!event) return <div>Loading...</div>;

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" p={5}>
      {isEditing ? (
        <Box as="form" onSubmit={handleUpdate} width="100%" maxW="600px">
          <Input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            mb={3}
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb={3}
          />
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            mb={3}
          />
          <Input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            mb={3}
          />
          <Input
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            mb={3}
          />
          <Input
            value={categoryNames}
            onChange={(e) => setCategoryNames(e.target.value)}
            mb={3}
          />
          <Button type="submit" colorScheme="pink">
            Update Event
          </Button>
          <Button onClick={() => setIsEditing(false)} ml={3}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Box width="100%" maxW="600px">
          <Heading>{event.title}</Heading>
          <Text>{event.description}</Text>
          <Image src={event.image} alt={event.title} boxSize="400px" />
          <Text>Start: {event.startTime}</Text>
          <Text>End: {event.endTime}</Text>
          <Text>Categorieën: {categoryNames}</Text>
          <Text>Gecreëerd door: {createdBy ? createdBy.name : "Onbekend"}</Text>
          {createdBy && createdBy.image && (
            <Image
              src={createdBy.image}
              alt={createdBy.name}
              boxSize="100px"
            />
          )}
          <Button onClick={() => setIsEditing(true)} colorScheme="green" mt={3}>
            Edit
          </Button>
          <Button onClick={handleDelete} colorScheme="red" mt={3} ml={3}>
            Delete
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default EventPage;
