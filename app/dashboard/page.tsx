"use client"; // Required for client-side interactivity in Next.js

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged, validatePassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function DashboardPage() {
  const [basicInfo, setBasicInfo] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null); // Store user ID for testing
  const [oldPassword, setOldPassword] = useState(""); // for changing password; reauthentication
  const [newPassword, setNewPassword] = useState(""); // for changing password
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Save the user ID
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Basic Info Updated: ${basicInfo}`);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message Sent: ${message}`);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (auth.currentUser) {
      // First, check that the old password is correct
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        oldPassword
      )
      reauthenticateWithCredential(auth.currentUser, credential).then(async (result) => {
        //Password entered is correct
        // Next, validate password and only actually submit it if it's valid
        const status = await validatePassword(auth, newPassword);
        if (status.isValid) {
          updatePassword(auth.currentUser!, newPassword).then(() => {
            // Update successful.
            setNewPassword("");
            setOldPassword("");
            alert("Password updated succesfully.");
          }).catch((error) => {
            switch (error) {
              case "auth/requires-recent-login":
                // Handle reauthentication
                setError("Reauthentication needed");
                break;
              default:
                setError("An unknown error occured: " + error.message);
            }
          });
          
        } else {
          // Password is not valid, we should show an error explaining why.
          const notLongEnough = status.meetsMinPasswordLength !== true;
          const tooLong = status.meetsMaxPasswordLength !== true;
          const needsLowerCase = status.containsLowercaseLetter !== true;
          const needsUpperCase = status.containsUppercaseLetter !== true;
          const needsSpecialCharacter = status.containsNonAlphanumericCharacter !== true;
          const needsNumber = status.containsNumericCharacter !== true;

          if (notLongEnough) {
            setError("Your password must contain at least " + status.passwordPolicy.customStrengthOptions.minPasswordLength + " characters.");
          } else if (tooLong) {
            setError("Your password cannot exceed " + status.passwordPolicy.customStrengthOptions.maxPasswordLength + " characters.");
          } else if (needsLowerCase) {
            setError("Your password must contain at least one lowercase character.");
          } else if (needsUpperCase) {
            setError("Your password must contain at least one uppercase character.");
          } else if (needsSpecialCharacter) {
            setError("Your password must contain at least one special character.");
          } else if (needsNumber) {
            setError("Your password must contain at least one number.");
          }
        }
     })
     .catch((error) => {
        //Incorrect password or some other error
        setError("The old password you entered is not correct.");
     });
    }
    else {
      // The user is not signed in
      router.push("/login");
    }
  }

  return (
    <div className="bg-indigo-50 min-h-screen p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard- {userId}</h1>

      {/* Section for Updating Basic Info */}
      <h2 className="section-title">Update Basic Info</h2>
      <form onSubmit={handleBasicInfoSubmit} className="form">
        <textarea
          className="form-textarea"
          placeholder="Enter basic information here..."
          value={basicInfo}
          onChange={(e) => setBasicInfo(e.target.value)}
        />
        <button type="submit" className="btn">
          Update Info
        </button>
      </form>

      {/* Section for Sending a Message */}
      <h2 className="section-title">Send Message</h2>
      <form onSubmit={handleMessageSubmit} className="form">
        <textarea
          className="form-textarea"
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-green">
          Send Message
        </button>
      </form>

      {/* Section for Updating Password */}
      <h2 className="section-title">Update Password</h2>
      <form onSubmit={handlePasswordSubmit} className="form">
        <input
          className="form-textarea"
          type="password"
          placeholder="Enter your old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          className="form-textarea"
          type="password"
          placeholder="Enter your new password here..."
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn btn-green">
          Update Password
        </button>
      </form>
    </div>
  );
}
