import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, Flex, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddEventForm from './AddEventForm';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Fetch events
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch categories
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, events]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const getCategoryNames = (categoryIds) => {
    return categoryIds.map(id => {
      const category = categories.find(cat => cat.id.toString() === id.toString());
      return category ? category.name : "Onbekend";
    }).join(", ");
  };

  return (
    <Box bg="white" minH="100vh" p={5}>
      <Flex direction="column" align="center" justify="center">
        <Heading mb={5}>Events</Heading>
        <Input
          placeholder="Search events"
          mb={5}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          width="100%"
          maxW="600px"
        />
        <AddEventForm onAddEvent={handleAddEvent} />
        {filteredEvents.map((event) => (
          <Box key={event.id} mb={5} p={5} borderWidth="1px" borderRadius="lg" width="100%" maxW="600px">
            <Heading size="md">
              <Link to={`/event/${event.id}`}>{event.title}</Link>
            </Heading>
            <Text>{event.description}</Text>
            <Image src={event.image} alt={event.title} boxSize="200px" />
            <Text>Start: {event.startTime}</Text>
            <Text>Eind: {event.endTime}</Text>
            <Text>
              Categorieën: {event.categoryIds ? getCategoryNames(event.categoryIds) : "Geen categorieën"}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default EventsPage;
