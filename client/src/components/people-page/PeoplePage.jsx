import NavBar from "../navbar-components/NavBar";
import LeftBar from "../navbar-components/LeftBar";
import "../../assets/styles/peoplePage.scss";

export default function PeoplePage() {
    return (

        <div id="people-main">
            <NavBar />
            <div className="leftBarFlex">
                <LeftBar />
                <div className="mainSection">
                    <div className="userInfo">
                        <h3>John Doe</h3>
                        <p>@johndoe_97</p>
                    </div>
                    <div className="userImg">
                        <img src="https://images.pexels.com/photos/1182825/pexels-photo-1182825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profilePhoto" />
                    </div>
                    <div className="actionBtns">
                        <button>Follow</button>
                    </div>
                </div>
            </div>
        </div>
    );
}