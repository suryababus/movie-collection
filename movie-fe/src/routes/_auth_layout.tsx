import { Outlet, createFileRoute } from "@tanstack/react-router";

import BGImage from "@/assets/movie-collage-bg.jpeg";

export const Route = createFileRoute("/_auth_layout")({
  component: AuthWrapper,
});
function AuthWrapper() {
  return (
    <div
      className="h-screen w-screen bg-background dark flex justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(2,0,36,1) 0%, rgba(12,12,91,0.4276304271708683) 50%, rgba(2,0,36,1) 100%), url(${BGImage})`,
      }}
    >
      <Outlet />
    </div>
  );
}
