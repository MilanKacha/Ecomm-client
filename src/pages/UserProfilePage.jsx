import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar />
      <h1 className="mx-auto text-2xl">My Profile</h1>
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;
