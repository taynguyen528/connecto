import FriendRequest from "@components/FriendRequest";
import PostCreation from "@components/PostCreation";
import PostList from "@components/PostList";
import SideBar from "@components/SideBar";

function HomePage() {
  return (
    <div className="flex gap-4 bg-dark-200 p-6">
      <SideBar />
      <div className="flex-1">
        <PostCreation />
        <PostList />
      </div>
      <div className="hidden w-64 sm:block">
        <FriendRequest />
      </div>
    </div>
  );
}

export default HomePage;
