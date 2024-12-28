import React, { useEffect, useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

interface Message {
  id: number;
  sender: string;
  message: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [nextId, setNextId] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/messages.json")
      .then((response) => response.json())
      .then((data: Message[]) => {
        setMessages(data);
        setNextId(data.length + 1);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: nextId,
      sender: "user",
      message: input,
    };

    setMessages([...messages, newMessage]);
    setNextId(nextId + 1);
    setInput("");
    setIsLoading(true);

    // Simulate a response
    setTimeout(() => {
      const responseMessage: Message = {
        id: nextId + 1,
        sender: "bot",
        message: `You said: ${input}`,
      };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
      setNextId(nextId + 2);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 600, p: 2, mb: 2 }}>
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
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Box>
        )}
      </Paper>
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Type a message"
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
