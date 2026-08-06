// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../../utils/Firebase/firebase";
// import { Button, Image } from "@mantine/core";

// import google from "../../assets/GoogleIcon.png";
// import { GOOGLE_LOGIN_TEXT } from "~/utils/string";
// export const GoogleLogin = () => {
//   const googleButtonStyle = {
//     display: "inline-flex",
//     backgroundColor: "#ffffff",
//     color: "#757575",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     padding: "10px 16px",
//     fontSize: "14px",
//     fontWeight: "500",
//     cursor: "pointer",
//     boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
//   };

//   const googleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       // Access token and profile data are securely handled by Firebase
//       //   setUser(result.user);
//       console.log("Logged in user:", result.user);
//     } catch (e) {
//       console.error("Authentication Error:", e);
//     }
//   };
//   return (
//     <>
//       <Button
//         justify="center"
//         onClick={googleLogin}
//         style={googleButtonStyle}
//         rightSection={<span />}
//         leftSection={<span />}
//       >
//         <Image
//           src={google}
//           style={{ width: "25px", height: "25px", marginRight: "10px" }}
//         />
//         {GOOGLE_LOGIN_TEXT}
//       </Button>
//     </>
//   );
// };
