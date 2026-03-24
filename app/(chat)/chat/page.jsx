import Chat from "@/components/chat/chat"; // Adjust import based on your folder structure

export default function Home() {
  return (
    <div className="container-fluid bg-light vh-100">
      <div className="row h-100 align-items-center justify-content-center">
        <h2 className="text-center mb-4 w-100">Chat Application</h2>
        <div className="col-12 col-md-5 d-flex justify-content-center mb-3 mb-md-0">
          <Chat chatTitle="Infinisoft Chat 1" username="jhon" />
        </div>
        <div className="col-12 col-md-5 d-flex justify-content-center">
          <Chat chatTitle="Infinisoft Chat 2" username="jane" />
        </div>
      </div>
    </div>
  );
}
