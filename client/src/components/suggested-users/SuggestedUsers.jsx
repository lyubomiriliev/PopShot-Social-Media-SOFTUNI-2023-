import "../../assets/styles/suggestedUsers.scss";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import SuggestedUser from "./SuggestedUser";

export default function SuggestedUsers() {

    const { suggestedUsers } = useGetSuggestedUsers();


    return (
        <div className="item">
            <div>
                {suggestedUsers.length !== 0 && (
                    <span>Suggested users</span>
                )}
            </div>
            <div>
                {suggestedUsers.map((user) => (
                    <SuggestedUser user={user} key={user.id} />
                ))}
            </div>
        </div>
    );
}