import Chat from "@/components/chat/chat"; // Adjust import based on your folder structure

export default function Home() {
  return (
    <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center flex-wrap">
      <Chat chatTitle="Infinisoft Chat 1" />
      <Chat chatTitle="Infinisoft Chat 2" />
    </div>
  );
}