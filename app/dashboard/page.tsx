"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import EditableProfileInformation from "@/components/EditableProfileInformation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Container, Typography, TextField, Button, Paper, Grid, Snackbar, Alert, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function DashboardPage() {
  const [uid, setUID] = useState("");
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<Date | null>(new Date());
  const [scheduleError, setScheduleError] = useState<string>("");


  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) { 
        setUID(user.uid);
        const docRef = doc(db, "food_pantries", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setHours(data.hours);
          setAddress(data.address);
          setPhone(data.phone);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleUpdate = async (field: string, value: string) => {
    try {
      const docRef = doc(db, "food_pantries", uid);
      await updateDoc(docRef, { [field]: value });
      setSnackbarMessage(`${field} updated successfully!`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating document:", error);
      setSnackbarMessage(`Failed to update ${field}.`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, "food_pantries", uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          const subscribers: string[] = data.subscribers;
          const pantryName: string = data.name;
  
          const response = await fetch("/api/twilioSendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subscribers, pantryName, message, uid }),
          });
  
          const result = await response.json();
  
          if (response.ok) {
            setSnackbarMessage(`Message Sent Successfully: ${message}`);
            setSnackbarSeverity("success");
          } else {
            setSnackbarMessage(`Error: ${result.error}`);
            setSnackbarSeverity("error");
          }
  
          setOpenSnackbar(true);
          setMessage("");
        }
      }
    } catch (error) {
      console.error("Send message failed:", error);
      setSnackbarMessage(`An error occurred while trying to send the message.`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (auth.currentUser) {
      try {
        const credential = EmailAuthProvider.credential(auth.currentUser.email!, oldPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
        setSnackbarMessage("Password updated successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setNewPassword("");
        setOldPassword("");
      } catch (error) {
        setError("Failed to update password. Please check your credentials.");
        console.error("Error updating document:", error);
      }
    } else {
      router.push("/login");
    }
  };

  const handleOpenScheduleDialog = () => {
    const now = new Date();
    const defaultTime = new Date(now.getTime() + 10 * 60 * 1000); // default 10 mins ahead
    setScheduledTime(defaultTime);
    setScheduleError("");
    setScheduleDialogOpen(true);
  };

  const handleScheduleMessageSubmit = async () => {
    try {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, "food_pantries", uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          const subscribers: string[] = data.subscribers;
          const pantryName: string = data.name;
  
          const response = await fetch("/api/twilioScheduleMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subscribers, pantryName, message, scheduledTime, uid }),
          });
  
          const result = await response.json();
  
          if (response.ok) {
            setSnackbarMessage(`Message Scheduled Successfully: ${message}`);
            setSnackbarSeverity("success");
          } else {
            setSnackbarMessage(`Error: ${result.error}`);
            setSnackbarSeverity("error");
          }
  
          setOpenSnackbar(true);
          setMessage("");
        }
      }
    } catch (error) {
      console.error("Send message failed:", error);
      setSnackbarMessage("An error occurred while trying to send the message.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome, {name}!
      </Typography>

      {/* Profile Update Section */}
      <Paper sx={{ p: 4, my: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Profile Information</Typography>
        <EditableProfileInformation info={hours} setInfo={setHours} onSubmit={(val) => handleUpdate("hours", val)} />
        <EditableProfileInformation info={address} setInfo={setAddress} onSubmit={(val) => handleUpdate("address", val)} />
        <EditableProfileInformation info={phone} setInfo={setPhone} onSubmit={(val) => handleUpdate("phone", val)} />
      </Paper>

      {/* Send Message Section */}
      <Paper sx={{ p: 4, my: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Send Message</Typography>
        <form onSubmit={handleMessageSubmit}>
          <TextField
            fullWidth
            label="Enter your message here..."
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <div style={{ display: 'flex'}}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: 20}}>
              Send Message
            </Button>

            <Button variant="outlined" color="secondary" onClick={handleOpenScheduleDialog}>
              Schedule Message
            </Button>
          </div>
        </form>
      </Paper>

      {/* Update Password Section */}
      <Paper sx={{ p: 4, my: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Update Password</Typography>
        <form onSubmit={handlePasswordSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Password
          </Button>
        </form>
      </Paper>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog open={scheduleDialogOpen} onClose={() => {
          handleScheduleMessageSubmit();
          setScheduleDialogOpen(false)
          }}>
          <DialogTitle>Schedule Message</DialogTitle>
            <DialogContent>
              <DateTimePicker
                value={scheduledTime}
                onChange={(newValue) => {
                  setScheduleError("");
                  setScheduledTime(newValue);
                }}
                minDateTime={new Date(Date.now() + 5 * 60 * 1000)} // 5 minutes from now
                maxDateTime={new Date(Date.now() + 35 * 24 * 60 * 60 * 1000)} // 35 days from now
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(scheduleError),
                    helperText: scheduleError || "Select a time between 5 minutes and 35 days from now.",
                    sx: { mt: 2 },
                  },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setScheduleDialogOpen(false)}>Cancel</Button>
              <Button onClick={async () => {
                if (!scheduledTime) return;

                // If the scheduled time is nearer than 5 min or farther than 35 days, prompt again
                const now = new Date();
                const minTime = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes
                const maxTime = new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000); // 35 days

                if (scheduledTime < minTime) {
                  setScheduleError("Scheduled time must be at least 5 minutes from now.");
                  return;
                }

                if (scheduledTime > maxTime) {
                  setScheduleError("Scheduled time cannot be more than 35 days ahead.");
                  return;
                }
              

                // TODO: functionality
              }} variant="contained" color="primary">
                Schedule
              </Button>
            </DialogActions>
        </Dialog>
      </LocalizationProvider>

      {/* Snackbar Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
