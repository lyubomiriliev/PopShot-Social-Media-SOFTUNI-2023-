import NavBar from "../navbar-components/NavBar";
import LeftBar from "../navbar-components/LeftBar";
import "../../assets/styles/peoplePage.scss";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect } from "react";

export default function PeoplePage() {



    const getAllUsers = async () => {

        const usersQuery = query(
            collection(db, "users"),
        );

        const querySnapshot = await getDocs(usersQuery);

        querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }

    useEffect(() => {

        getAllUsers();

    }, [])

    return (

        <div id="people-main">
            <NavBar />
            <div className="leftBarFlex">
                <LeftBar />
                <div className="mainSection">
                    <div className="userImg">
                        <img src="https://images.pexels.com/photos/1182825/pexels-photo-1182825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profilePhoto" />
                    </div>

                    <div className="actionBtns">
                        <button>Follow</button>
                    </div>
                    <div className="userInfo">
                        <h3>John Doe</h3>
                        <p>@johndoe_97</p>
                        <p>3660 followers</p>
                    </div>
                </div>

            </div>
        </div>
    );
}