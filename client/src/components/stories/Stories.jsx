import stories from '../../utils/StoriesUtil';
import Story from './Story';


export default function Stories() {
    return (
        <div className="stories">
            {stories.map(story => (
                <Story story={story} key={story.id} />
            ))}
        </div>
    );
}