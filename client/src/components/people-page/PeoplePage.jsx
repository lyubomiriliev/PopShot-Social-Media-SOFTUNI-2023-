import "../../assets/styles/peoplePage.scss";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import Person from "./Person";
import useAuthStore from "../../store/authStore";
import NavBar from "../navbar-components/NavBar";
import LeftBar from "../navbar-components/LeftBar";

export default function PeoplePage() {


    const [allUsers, setAllUsers] = useState([]);
    const authUser = useAuthStore((state) => state.user);



    useEffect(() => {
        const getAllUsers = async () => {

            const usersQuery = query(
                collection(db, "users"),
            );

            const querySnapshot = await getDocs(usersQuery);

            const users = [];

            querySnapshot.forEach(doc => {
                users.push({ ...doc.data(), id: doc.id })
            })
            setAllUsers(users)

        }

        if (authUser) getAllUsers();

    }, [authUser])

    return (
        <>
            <div className="peopleContainer" >
                <NavBar />
                <div id="people-main" >
                    <LeftBar />
                    <div className="leftBarFlex">
                        <div className="peopleWrapper">
                            {allUsers.map((user) => (
                                <Person user={user} key={user.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}