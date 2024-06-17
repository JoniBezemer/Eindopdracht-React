import React, { useState } from 'react';
import { Box, Button, Input, Textarea, Flex } from '@chakra-ui/react';

const AddEventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [categories, setCategories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      description,
      image,
      startTime,
      endTime,
      categories: categories.split(',').map(cat => cat.trim())
    };

    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    })
      .then(response => response.json())
      .then(data => {
        onAddEvent(data);
        setTitle('');
        setDescription('');
        setImage('');
        setStartTime('');
        setEndTime('');
        setCategories('');
      })
      .catch(error => console.error('Error adding event:', error));
  };

  return (
    <Flex direction="column" align="center" justify="center" width="100%" maxW="600px" mb={5}>
      <Box as="form" onSubmit={handleSubmit} width="100%">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          mb={3}
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          mb={3}
        />
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          mb={3}
        />
        <Input
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Start Time"
          mb={3}
        />
        <Input
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Time"
          mb={3}
        />
        <Input
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Categories (comma separated)"
          mb={3}
        />
        <Button type="submit" colorScheme="pink">Add Event</Button>
      </Box>
    </Flex>
  );
};

export default AddEventForm;
