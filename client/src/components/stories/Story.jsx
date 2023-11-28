import '../../assets/styles/stories.scss';
import stories from '../../utils/StoriesUtil';


export default function Story() {
    return (
        <div className="story" >
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="storyImage" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    );
}