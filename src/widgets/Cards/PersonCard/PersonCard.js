// import React from "react";
// import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// const ProfileProgress = ({ imageUrl, progress, name, adminNo }) => {
//   return (
//     <div style={{ width: 150, height: 150, position: "relative" }}>
//       {/* Circular progress bar with children */}
//       <CircularProgressbarWithChildren
//         value={progress}
//         strokeWidth={6}
//         styles={buildStyles({
//           pathColor: "#6c63ff",
//           trailColor: "#e6e6e6",
//         })}
//       >
//         {/* Profile image inside */}
//         <img
//           src={imageUrl}
//           alt="Profile"
//           style={{
//             width: "85%",
//             height: "85%",
//             borderRadius: "50%",
//             objectFit: "cover",
//           }}
//         />
//         {/* Badge always inside */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 8,
//             right: 8,
//             background: "#6c63ff",
//             color: "#fff",
//             fontSize: 12,
//             fontWeight: "bold",
//             padding: "2px 6px",
//             borderRadius: "12px",
//           }}
//         >
//           {progress}%
//         </div>
//       </CircularProgressbarWithChildren>

//       {/* Details */}
//       <div style={{ textAlign: "center", marginTop: 10 }}>
//         <div style={{ fontWeight: "bold" }}>{name}</div>
//         <div style={{ fontSize: 12, color: "#666" }}>Admin No: {adminNo}</div>
//       </div>
//     </div>
//   );
// };

// export default ProfileProgress;
