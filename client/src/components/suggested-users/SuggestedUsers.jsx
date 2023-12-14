import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import SuggestedUser from "./SuggestedUser";

export default function SuggestedUsers() {

    const { suggestedUsers } = useGetSuggestedUsers();


    return (
        <div className="item">

            {suggestedUsers.length !== 0 && (
                <span>Suggested users</span>
            )}

            {suggestedUsers.map((user) => (
                <SuggestedUser user={user} key={user.id} />
            ))}
        </div>
    );
}