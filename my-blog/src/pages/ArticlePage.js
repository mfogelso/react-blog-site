import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import articles from './article-content';
import useUser from '../hooks/useUser';
import AddCommentForm from '../components/AddCommentForm';
import CommentsList from '../components/CommentsList';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
    const { canUpvote } = articleInfo;
    const { articleId } = useParams();
    const { user, isLoading } = useUser();

    //adding empty array at the end will only run the useEffect when the component is mounted
    useEffect(() => {
        //need to create a wrapper async function inside because you can't pass async as first prop in a function
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`, {
                headers,
            });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        };
        if(!isLoading) {
            loadArticleInfo();
        }
    }, [isLoading, user, articleId]);

    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className='upvotes-section'>
                {user
                    ? <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}
                    </button>
                    : <button>Log In to Upvote</button>
                }
                <p>This articles has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph, i) => (
                //only use index for key when the content shown is static
                <p key={i}>{paragraph}</p>
            ))}
            {user
                ? <AddCommentForm 
                    articleName={articleId}
                    onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
                : <button>Log In to Comment</button>
            }
            <CommentsList comments={articleInfo.comments} />
        </>

    );
}

export default ArticlePage;