// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import DashboardLayout from "../../../components/layout/DashboardLayout";
// import { getAppointment, getAppointmentSignature } from "../../../api/appointments.api";


// function getDisplayName() {
//   try {
//     const cached = JSON.parse(localStorage.getItem("profile") || "null");
//     if (cached?.firstName) return `Dr. ${cached.firstName} ${cached.lastName || ""}`.trim();
//   } catch {
//     // ignore parse errors, fall through to default
//   }
//   return "Doctor";
// }

// export default function VideoCallPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const clientRef = useRef(null);
//   const [status, setStatus] = useState("loading"); 
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     async function startCall() {
//       try {
//         setStatus("loading");
//         setError("");

//         const [appointment, signatureResponse] = await Promise.all([
//           getAppointment(id),
//           getAppointmentSignature(id),
//         ]);

//         if (cancelled) return;
//         const signature = signatureResponse?.signature || signatureResponse?.token;
//         const sdkKey =
//           signatureResponse?.sdkKey ||
//           signatureResponse?.clientId ||
//           import.meta.env.VITE_ZOOM_SDK_KEY;
//         const meetingNumber = appointment?.meeting_id;
//         const password = appointment?.meeting_password || "";
//         if (!signature || !sdkKey || !meetingNumber) {
//           throw new Error(
//             "Missing signature, SDK key, or meeting number -- check the console.log output below to see what's actually available.",
//           );
//         }
//         console.log("Zoom join params:", { signature, sdkKey, meetingNumber, password });

//         const { default: ZoomMtgEmbedded } = await import("@zoom/meetingsdk/embedded");
//         const client = ZoomMtgEmbedded.createClient();
//         clientRef.current = client;

//         await client.init({
//           zoomAppRoot: containerRef.current,
//           language: "en-US",
//         });

//         if (cancelled) return;
//         setStatus("joining");

//         await client.join({
//           sdkKey,
//           signature,
//           meetingNumber: String(meetingNumber),
//           password,
//           userName: getDisplayName(),
//         });

//         if (!cancelled) setStatus("in-call");
//       } catch (err) {
//         if (!cancelled) {
//           console.error("Zoom join error:", err);
//           setError(err.message || "Could not join the call.");
//           setStatus("error");
//         }
//       }
//     }

//     startCall();

//     return () => {
//       cancelled = true;
//       clientRef.current?.leaveMeeting?.().catch(() => {});
//     };
//   }, [id]);

//   const handleLeave = async () => {
//     await clientRef.current?.leaveMeeting?.().catch(() => {});
//     navigate("/docdashboard/appointments");
//   };

//   return (
//     <DashboardLayout>
//       <div className="p-6 h-full flex flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <p className="text-sm text-gray-500">
//             {status === "loading" && "Preparing call..."}
//             {status === "joining" && "Joining meeting..."}
//             {status === "in-call" && "In call"}
//             {status === "error" && "Could not join call"}
//           </p>
//           <button
//             onClick={handleLeave}
//             className="text-xs border border-red-300 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
//           >
//             Leave Call
//           </button>
//         </div>

//         {error && (
//           <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
//             {error}
//           </div>
//         )}

//         <div ref={containerRef} className="flex-1 rounded-2xl overflow-hidden bg-black" />
//       </div>
//     </DashboardLayout>
//   );
// }