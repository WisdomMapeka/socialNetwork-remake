import RecommendedPeople from "./homepageCol2/RecommendedPeople"
import PostingData from "./homepageCol2/PostingData"
import UserFeeds from "./homepageCol2/UserFeeds"

function HomePageCol2(){

    return(
        <div className="p-3">
           <RecommendedPeople />
           <PostingData />
           <UserFeeds />
        </div>
    )
}

export default HomePageCol2