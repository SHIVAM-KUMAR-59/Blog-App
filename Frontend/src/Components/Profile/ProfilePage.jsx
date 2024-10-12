import Hero from "./Hero";
import Sidebar from "./Sidebar";
import styles from "./profile.module.css";

const ProfilePage = ({ data }) => {
  return (
    <div className={styles.profilePage}>
      <Sidebar data={data} />
      <Hero data={data} />
    </div>
  );
};

export default ProfilePage;
