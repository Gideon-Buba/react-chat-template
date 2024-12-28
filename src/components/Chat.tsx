// src/components/Chat.tsx
import React, { useEffect, useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

interface Message {
  id: number;
  sender: string;
  message: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/messages.json")
      .then((response) => response.json())
      .then((data: Message[]) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 600, p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Chat App Template
        </Typography>
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              alignItems="flex-start"
              sx={{
                backgroundColor: message.sender === "user" ? "#dcf8c6" : "#fff",
                borderRadius: 1,
                marginBottom: 1,
                padding: 1,
                alignSelf:
                  message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={message.message}
                primaryTypographyProps={{
                  variant: "body1",
                  color:
                    message.sender === "user" ? "textPrimary" : "textSecondary",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Chat;
