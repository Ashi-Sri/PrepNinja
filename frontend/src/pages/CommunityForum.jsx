import React, { useState } from 'react';

const CommunityForum = () => {
  // Sample data - in a real app, this would come from a backend
  const [users] = useState([
    { id: 1, name: "John Doe", avatar: "https://via.placeholder.com/40", reputation: 1250 },
    { id: 2, name: "Jane Smith", avatar: "https://via.placeholder.com/40", reputation: 3420 },
    { id: 3, name: "Alex Johnson", avatar: "https://via.placeholder.com/40", reputation: 785 },
    { id: 4, name: "Current User", avatar: "https://via.placeholder.com/40", reputation: 320 }
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to implement authentication in React?",
      content: "I'm building a React application and need to implement user authentication. What's the best approach?",
      userId: 1,
      timestamp: "2025-04-10T14:30:00Z",
      votes: 12,
      likes: [],
      dislikes: [],
      tags: ["react", "authentication", "javascript"],
      answers: [
        {
          id: 1,
          content: "I recommend using Firebase Authentication. It's easy to set up and provides many authentication methods out of the box.",
          userId: 2,
          timestamp: "2025-04-10T15:45:00Z",
          votes: 8,
          likes: [],
          dislikes: [],
          comments: [
            { id: 1, content: "Firebase is great, but what about self-hosted solutions?", userId: 3, timestamp: "2025-04-10T16:20:00Z" }
          ]
        },
        {
          id: 2,
          content: "Auth0 is another good option. It offers social login integrations and sophisticated user management.",
          userId: 3,
          timestamp: "2025-04-11T09:15:00Z",
          votes: 5,
          likes: [],
          dislikes: [],
          comments: []
        }
      ]
    },
    {
      id: 2,
      title: "My Amazon SDE interview experience",
      content: "I recently interviewed for an SDE position at Amazon. Here's my experience with the process and tips for preparation...",
      userId: 2,
      timestamp: "2025-04-08T10:00:00Z",
      votes: 25,
      likes: [4],
      dislikes: [],
      tags: ["interview-experience", "amazon", "sde"],
      answers: [
        {
          id: 1,
          content: "Thanks for sharing! How long did you prepare for the interview?",
          userId: 1,
          timestamp: "2025-04-08T11:20:00Z",
          votes: 3,
          likes: [],
          dislikes: [],
          comments: [
            { id: 1, content: "I prepared for about 3 months, focusing mainly on algorithms and system design.", userId: 2, timestamp: "2025-04-08T12:05:00Z" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Best practices for responsive design in 2025",
      content: "What are the current best practices for responsive web design in 2025? Are there any new techniques I should be aware of?",
      userId: 4, // Current user's question
      timestamp: "2025-04-14T09:30:00Z",
      votes: 5,
      likes: [1, 2],
      dislikes: [],
      tags: ["css", "responsive-design", "frontend"],
      answers: []
    }
  ]);

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [newAnswerContent, setNewAnswerContent] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const [activeCommentAnswer, setActiveCommentAnswer] = useState(null);
  const [newQuestionData, setNewQuestionData] = useState({
    title: "",
    content: "",
    tags: ""
  });

  const [view, setView] = useState("questions"); // questions, question-detail, new-question
  const [showConfirmDelete, setShowConfirmDelete] = useState(null); // ID of question to delete or null

  const currentUser = users.find(user => user.id === 4); // Assume user 4 is the current user

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleVote = (questionId, answerId, voteType) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        if (question.id === questionId) {
          if (answerId) {
            // Vote on an answer
            const updatedAnswers = question.answers.map(answer => {
              if (answer.id === answerId) {
                return {
                  ...answer,
                  votes: voteType === 'up' ? answer.votes + 1 : answer.votes - 1
                };
              }
              return answer;
            });
            return { ...question, answers: updatedAnswers };
          } else {
            // Vote on the question
            return {
              ...question,
              votes: voteType === 'up' ? question.votes + 1 : question.votes - 1
            };
          }
        }
        return question;
      });
    });
  };

  const handleLikeDislike = (questionId, answerId, action) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        if (questionId && question.id === questionId) {
          if (answerId) {
            // Handle like/dislike on answer
            const updatedAnswers = question.answers.map(answer => {
              if (answer.id === answerId) {
                let likes = [...answer.likes];
                let dislikes = [...answer.dislikes];
                
                if (action === 'like') {
                  if (likes.includes(currentUser.id)) {
                    // Remove like if already liked
                    likes = likes.filter(id => id !== currentUser.id);
                  } else {
                    // Add like and remove dislike if exists
                    likes.push(currentUser.id);
                    dislikes = dislikes.filter(id => id !== currentUser.id);
                  }
                } else if (action === 'dislike') {
                  if (dislikes.includes(currentUser.id)) {
                    // Remove dislike if already disliked
                    dislikes = dislikes.filter(id => id !== currentUser.id);
                  } else {
                    // Add dislike and remove like if exists
                    dislikes.push(currentUser.id);
                    likes = likes.filter(id => id !== currentUser.id);
                  }
                }
                
                return { ...answer, likes, dislikes };
              }
              return answer;
            });
            return { ...question, answers: updatedAnswers };
          } else {
            // Handle like/dislike on question
            let likes = [...question.likes];
            let dislikes = [...question.dislikes];
            
            if (action === 'like') {
              if (likes.includes(currentUser.id)) {
                // Remove like if already liked
                likes = likes.filter(id => id !== currentUser.id);
              } else {
                // Add like and remove dislike if exists
                likes.push(currentUser.id);
                dislikes = dislikes.filter(id => id !== currentUser.id);
              }
            } else if (action === 'dislike') {
              if (dislikes.includes(currentUser.id)) {
                // Remove dislike if already disliked
                dislikes = dislikes.filter(id => id !== currentUser.id);
              } else {
                // Add dislike and remove like if exists
                dislikes.push(currentUser.id);
                likes = likes.filter(id => id !== currentUser.id);
              }
            }
            
            return { ...question, likes, dislikes };
          }
        }
        return question;
      });
    });

    // Update active question if we're viewing it
    if (activeQuestion && activeQuestion.id === questionId) {
      setActiveQuestion(
        questions.find(q => q.id === questionId)
      );
    }
  };

  const handleDeleteQuestion = (questionId) => {
    // Filter out the question to delete
    setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== questionId));
    setShowConfirmDelete(null);
    
    // If we're viewing the question that's being deleted, go back to the list
    if (activeQuestion && activeQuestion.id === questionId) {
      setActiveQuestion(null);
      setView("questions");
    }
  };

  const handleDeleteAnswer = (questionId, answerId) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        if (question.id === questionId) {
          // Filter out the answer to delete
          const updatedAnswers = question.answers.filter(answer => answer.id !== answerId);
          return { ...question, answers: updatedAnswers };
        }
        return question;
      });
    });
    
    // Update active question
    if (activeQuestion && activeQuestion.id === questionId) {
      setActiveQuestion(
        questions.find(q => q.id === questionId)
      );
    }
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (!newAnswerContent.trim()) return;

    setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        if (question.id === activeQuestion.id) {
          const newAnswer = {
            id: question.answers.length + 1,
            content: newAnswerContent,
            userId: currentUser.id,
            timestamp: new Date().toISOString(),
            votes: 0,
            likes: [],
            dislikes: [],
            comments: []
          };
          return {
            ...question,
            answers: [...question.answers, newAnswer]
          };
        }
        return question;
      });
    });

    setNewAnswerContent("");
    
    // Update active question
    setActiveQuestion(
      questions.find(q => q.id === activeQuestion.id)
    );
  };

  const handleSubmitComment = (e, answerId) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;

    setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        if (question.id === activeQuestion.id) {
          const updatedAnswers = question.answers.map(answer => {
            if (answer.id === answerId) {
              const newComment = {
                id: answer.comments.length + 1,
                content: newCommentContent,
                userId: currentUser.id,
                timestamp: new Date().toISOString()
              };
              return {
                ...answer,
                comments: [...answer.comments, newComment]
              };
            }
            return answer;
          });
          return {
            ...question,
            answers: updatedAnswers
          };
        }
        return question;
      });
    });

    setNewCommentContent("");
    setActiveCommentAnswer(null);
    
    // Update active question
    setActiveQuestion(
      questions.find(q => q.id === activeQuestion.id)
    );
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    
    const { title, content, tags } = newQuestionData;
    if (!title.trim() || !content.trim()) return;
    
    const newQuestion = {
      id: questions.length + 1,
      title: title,
      content: content,
      userId: currentUser.id,
      timestamp: new Date().toISOString(),
      votes: 0,
      likes: [],
      dislikes: [],
      tags: tags.trim() ? tags.split(',').map(tag => tag.trim()) : [],
      answers: []
    };
    
    setQuestions([newQuestion, ...questions]);
    setNewQuestionData({ title: "", content: "", tags: "" });
    setView("questions");
  };

  const renderDeleteConfirmation = () => {
    if (!showConfirmDelete) return null;
    
    const questionToDelete = questions.find(q => q.id === showConfirmDelete);
    if (!questionToDelete) return null;
    
    return (
      <div className="delete-confirmation-overlay">
        <div className="delete-confirmation-modal">
          <h3>Delete Question</h3>
          <p>Are you sure you want to delete the question:</p>
          <p className="question-to-delete">"{questionToDelete.title}"</p>
          <p>This action cannot be undone.</p>
          <div className="modal-actions">
            <button 
              className="secondary-button" 
              onClick={() => setShowConfirmDelete(null)}
            >
              Cancel
            </button>
            <button 
              className="delete-button" 
              onClick={() => handleDeleteQuestion(showConfirmDelete)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuestionsList = () => (
    <div className="questions-list">
      <div className="header-actions">
        <h1>Community Discussion Forum</h1>
        <div className="user-welcome">
          <span>Welcome, <strong>{currentUser.name}</strong></span>
          <button 
            className="primary-button"
            onClick={() => setView("new-question")}
          >
            Ask Question
          </button>
        </div>
      </div>
      
      <div className="questions">
        {questions.map(question => {
          const author = users.find(user => user.id === question.userId);
          const isCurrentUserQuestion = question.userId === currentUser.id;
          const isLiked = question.likes.includes(currentUser.id);
          const isDisliked = question.dislikes.includes(currentUser.id);
          
          return (
            <div key={question.id} className="question-summary">
              <div className="question-stats">
                <div className="stat">
                  <span className="number">{question.votes}</span>
                  <span className="label">votes</span>
                </div>
                <div className="stat">
                  <span className="number">{question.answers.length}</span>
                  <span className="label">answers</span>
                </div>
              </div>
              
              <div className="question-content" onClick={() => {
                setActiveQuestion(question);
                setView("question-detail");
              }}>
                <h3>{question.title}</h3>
                <p className="excerpt">
                  {question.content.length > 150 
                    ? `${question.content.substring(0, 150)}...` 
                    : question.content}
                </p>
                
                <div className="question-meta">
                  <div className="tags">
                    {question.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="user-info">
                    <img 
                      src={author.avatar} 
                      alt={author.name} 
                      className="avatar-small"
                    />
                    <span className="name">{author.name}</span>
                    {isCurrentUserQuestion && <span className="you-label">(You)</span>}
                    <span className="timestamp">{formatDate(question.timestamp)}</span>
                  </div>
                </div>
              </div>
              
              <div className="question-actions">
                <div className="like-actions">
                  <button 
                    className={`like-button ${isLiked ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeDislike(question.id, null, 'like');
                    }}
                    title="Like this question"
                  >
                    <span className="like-icon">👍</span>
                    <span className="like-count">{question.likes.length}</span>
                  </button>
                  <button 
                    className={`dislike-button ${isDisliked ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeDislike(question.id, null, 'dislike');
                    }}
                    title="Dislike this question"
                  >
                    <span className="dislike-icon">👎</span>
                    <span className="dislike-count">{question.dislikes.length}</span>
                  </button>
                </div>
                
                {isCurrentUserQuestion && (
                  <button 
                    className="delete-question-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirmDelete(question.id);
                    }}
                    title="Delete this question"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderQuestionDetail = () => {
    if (!activeQuestion) return null;
    
    const questionAuthor = users.find(user => user.id === activeQuestion.userId);
    const isCurrentUserQuestion = activeQuestion.userId === currentUser.id;
    const isQuestionLiked = activeQuestion.likes.includes(currentUser.id);
    const isQuestionDisliked = activeQuestion.dislikes.includes(currentUser.id);
    
    return (
      <div className="question-detail">
        <button 
          className="back-button"
          onClick={() => {
            setActiveQuestion(null);
            setView("questions");
          }}
        >
          ← Back to Questions
        </button>
        
        <div className="question-header">
          <h2>{activeQuestion.title}</h2>
          <div className="post-info">
            <span>Asked: {formatDate(activeQuestion.timestamp)}</span>
            <span>By: {questionAuthor.name} {isCurrentUserQuestion && <span className="you-label">(You)</span>}</span>
          </div>
        </div>
        
        <div className="post question-body">
          <div className="vote-controls">
            <button 
              className="vote-button"
              onClick={() => handleVote(activeQuestion.id, null, 'up')}
            >
              ▲
            </button>
            <span className="vote-count">{activeQuestion.votes}</span>
            <button 
              className="vote-button"
              onClick={() => handleVote(activeQuestion.id, null, 'down')}
            >
              ▼
            </button>
            
            <div className="like-dislike-controls">
              <button 
                className={`like-button-small ${isQuestionLiked ? 'active' : ''}`}
                onClick={() => handleLikeDislike(activeQuestion.id, null, 'like')}
                title="Like this question"
              >
                👍 <span className="count">{activeQuestion.likes.length}</span>
              </button>
              <button 
                className={`dislike-button-small ${isQuestionDisliked ? 'active' : ''}`}
                onClick={() => handleLikeDislike(activeQuestion.id, null, 'dislike')}
                title="Dislike this question"
              >
                👎 <span className="count">{activeQuestion.dislikes.length}</span>
              </button>
            </div>
            
            {isCurrentUserQuestion && (
              <button 
                className="delete-button-small"
                onClick={() => setShowConfirmDelete(activeQuestion.id)}
                title="Delete this question"
              >
                🗑️
              </button>
            )}
          </div>
          
          <div className="post-content">
            <p>{activeQuestion.content}</p>
            
            <div className="tags-container">
              {activeQuestion.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            
            <div className="post-author">
              <img 
                src={questionAuthor.avatar} 
                alt={questionAuthor.name} 
                className="avatar"
              />
              <div>
                <span className="name">{questionAuthor.name} {isCurrentUserQuestion && <span className="you-label">(You)</span>}</span>
                <span className="reputation">{questionAuthor.reputation} reputation</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="answers-section">
          <h3>{activeQuestion.answers.length} Answers</h3>
          
          {activeQuestion.answers.map(answer => {
            const answerAuthor = users.find(user => user.id === answer.userId);
            const isCurrentUserAnswer = answer.userId === currentUser.id;
            const isAnswerLiked = answer.likes.includes(currentUser.id);
            const isAnswerDisliked = answer.dislikes.includes(currentUser.id);
            
            return (
              <div key={answer.id} className="post answer">
                <div className="vote-controls">
                  <button 
                    className="vote-button"
                    onClick={() => handleVote(activeQuestion.id, answer.id, 'up')}
                  >
                    ▲
                  </button>
                  <span className="vote-count">{answer.votes}</span>
                  <button 
                    className="vote-button"
                    onClick={() => handleVote(activeQuestion.id, answer.id, 'down')}
                  >
                    ▼
                  </button>
                  
                  <div className="like-dislike-controls">
                    <button 
                      className={`like-button-small ${isAnswerLiked ? 'active' : ''}`}
                      onClick={() => handleLikeDislike(activeQuestion.id, answer.id, 'like')}
                      title="Like this answer"
                    >
                      👍 <span className="count">{answer.likes.length}</span>
                    </button>
                    <button 
                      className={`dislike-button-small ${isAnswerDisliked ? 'active' : ''}`}
                      onClick={() => handleLikeDislike(activeQuestion.id, answer.id, 'dislike')}
                      title="Dislike this answer"
                    >
                      👎 <span className="count">{answer.dislikes.length}</span>
                    </button>
                  </div>
                  
                  {isCurrentUserAnswer && (
                    <button 
                      className="delete-button-small"
                      onClick={() => handleDeleteAnswer(activeQuestion.id, answer.id)}
                      title="Delete this answer"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                
                <div className="post-content">
                  <p>{answer.content}</p>
                  
                  <div className="post-author">
                    <img 
                      src={answerAuthor.avatar} 
                      alt={answerAuthor.name} 
                      className="avatar"
                    />
                    <div>
                      <span className="name">{answerAuthor.name} {isCurrentUserAnswer && <span className="you-label">(You)</span>}</span>
                      <span className="timestamp">{formatDate(answer.timestamp)}</span>
                    </div>
                  </div>
                  
                  <div className="comments">
                    {answer.comments.map(comment => {
                      const commentAuthor = users.find(user => user.id === comment.userId);
                      const isCurrentUserComment = comment.userId === currentUser.id;
                      
                      return (
                        <div key={comment.id} className="comment">
                          <p>
                            {comment.content}
                            <span className="comment-meta">
                              – {commentAuthor.name} {isCurrentUserComment && <span className="you-label">(You)</span>} {formatDate(comment.timestamp)}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                    
                    {activeCommentAnswer === answer.id ? (
                      <form 
                        className="comment-form"
                        onSubmit={(e) => handleSubmitComment(e, answer.id)}
                      >
                        <textarea
                          placeholder="Add a comment..."
                          value={newCommentContent}
                          onChange={(e) => setNewCommentContent(e.target.value)}
                          required
                        ></textarea>
                        <div className="form-actions">
                          <button type="submit" className="primary-button">Submit</button>
                          <button 
                            type="button" 
                            className="secondary-button"
                            onClick={() => {
                              setActiveCommentAnswer(null);
                              setNewCommentContent("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button 
                        className="text-button"
                        onClick={() => setActiveCommentAnswer(answer.id)}
                      >
                        Add a comment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="your-answer">
          <h3>Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              placeholder="Write your answer here..."
              value={newAnswerContent}
              onChange={(e) => setNewAnswerContent(e.target.value)}
              required
              rows="6"
            ></textarea>
            <button type="submit" className="primary-button">Post Your Answer</button>
          </form>
        </div>
      </div>
    );
  };

  const renderNewQuestion = () => (
    <div className="new-question">
      <button 
        className="back-button"
        onClick={() => setView("questions")}
      >
        ← Cancel and return to questions
      </button>
      
      <h2>Ask a New Question</h2>
      
      <form onSubmit={handleSubmitQuestion}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="What's your question? Be specific."
            value={newQuestionData.title}
            onChange={(e) => setNewQuestionData({...newQuestionData, title: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Body</label>
          <textarea
            id="content"
            placeholder="Provide details about your question..."
            value={newQuestionData.content}
            onChange={(e) => setNewQuestionData({...newQuestionData, content: e.target.value})}
            required
            rows="10"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            placeholder="Add tags separated by commas (e.g., react, javascript, authentication)"
            value={newQuestionData.tags}
            onChange={(e) => setNewQuestionData({...newQuestionData, tags: e.target.value})}
          />
        </div>
        
        <button type="submit" className="primary-button">Post Your Question</button>
      </form>
    </div>
  );

  const renderCurrentView = () => {
    switch (view) {
      case "question-detail":
        return renderQuestionDetail();
      case "new-question":
        return renderNewQuestion();
      case "questions":
      default:
        return renderQuestionsList();
    }
  };

  return (
    <div className="community-forum" style={styles.container}>
      <div className="forum-container" style={styles.forumContainer}>
        <div className="main-content" style={styles.mainContent}>
          {renderCurrentView()}
          {renderDeleteConfirmation()}
        </div>
      </div>
      <style>
        {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
          }
          
          .community-forum {
            min-height: 100vh;
          }
          
          .forum-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .main-content {
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            padding: 20px;
            position: relative;
          }
          
          .header-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .user-welcome {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .you-label {
            color: #0074cc;
            font-size: 0.85em;
            font-style: italic;
            margin-left: 2px;
          }
          
          h1 {
            margin: 0;
            color: #242729;
          }
          
          .primary-button {
            background-color: #0a95ff;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
          }
          
          .secondary-button {
            background-color: #e1ecf4;
            color: #39739d;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .delete-button {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .text-button {
            background: none;
            border: none;
            color: #0074cc;
            cursor: pointer;
            padding: 0;
            font-size: 13px;
            margin-top: 5px;
          }
          
          .back-button {
            background: none;
            border: none;
            color: #0074cc;
          }
          
          .questions-list h1 {
            margin-bottom: 20px;
          }
          
          .question-summary {
            display: flex;
            padding: 15px 0;
            border-bottom: 1px solid #e4e6e8;
            cursor: pointer;
          }
          
          .question-summary:hover {
            background-color: #f8f9f9;
          }
          
          .question-stats {
            display: flex;
            margin-right: 15px;
            min-width: 100px;
          }
          
          .stat {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 15px;
            min-width: 40px;
          }
          
          .number {
            font-size: 17px;
            font-weight: 500;
          }
          
          .label {
            font-size: 12px;
            color: #6a737c;
          }
          
          .question-content {
            flex: 1;
          }
          
          .question-content h3 {
            margin-top: 0;
            margin-bottom: 5px;
            color: #0074cc;
          }
          
          .excerpt {
            margin-top: 0;
            margin-bottom: 10px;
            color: #3c4146;
          }
          
          .question-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .tags {
            display: flex;
            flex-wrap: wrap;
          }
          
          .tag {
            background-color: #e1ecf4;
            color: #39739d;
            padding: 4px 6px;
            border-radius: 3px;
            margin-right: 5px;
            font-size: 12px;
          }
          
          .user-info {
            display: flex;
            align-items: center;
            font-size: 12px;
          }
          
          .avatar-small {
            width: 16px;
            height: 16px;
            border-radius: 3px;
            margin-right: 5px;
          }
          
          .name {
            color: #0074cc;
            margin-right: 5px;
          }
          
          .timestamp {
            color: #6a737c;
          }
          
          .question-detail .question-header {
            margin-bottom: 20px;
          }
          
          .question-header h2 {
            margin-top: 0;
            margin-bottom: 10px;
          }
          
          .post-info {
            color: #6a737c;
            font-size: 13px;
          }
          
          .post-info span {
            margin-right: 15px;
          }
          
          .post {
            display: flex;
            padding: 20px 0;
            border-bottom: 1px solid #e4e6e8;
          }
          
          .vote-controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 20px;
            min-width: 40px;
          }
          
          .vote-button {
            background: none;
            border: none;
            color: #6a737c;
            cursor: pointer;
            font-size: 24px;
            padding: 0;
          }
          
          .vote-count {
            font-size: 18px;
            font-weight: 500;
            margin: 5px 0;
          }
          
          .post-content {
            flex: 1;
          }
          
          .tags-container {
            margin: 15px 0;
          }
          
          .post-author {
            display: flex;
            align-items: center;
            margin-top: 15px;
            padding: 10px;
            background-color: #f8f9f9;
            border-radius: 3px;
            max-width: 200px;
          }
          
          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 3px;
            margin-right: 10px;
          }
          
          .reputation {
            display: block;
            font-size: 12px;
            color: #6a737c;
          }
          
          .answers-section h3 {
            margin: 20px 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #e4e6e8;
          }
          
          .comments {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #e4e6e8;
          }
          
          .comment {
            padding: 5px 0;
            border-bottom: 1px solid #f1f2f3;
            font-size: 13px;
          }
          
          .comment p {
            margin: 0;
          }
          
          .comment-meta {
            color: #6a737c;
          }
          
          .comment-form textarea {
            width: 100%;
            border: 1px solid #d6d9dc;
            border-radius: 3px;
            padding: 8px;
            margin: 10px 0;
            resize: vertical;
          }
          
          .form-actions {
            display: flex;
            gap: 10px;
          }
          
          .your-answer {
            margin-top: 30px;
          }
          
          .your-answer textarea {
            width: 100%;
            border: 1px solid #d6d9dc;
            border-radius: 3px;
            padding: 8px;
            margin: 10px 0;
            resize: vertical;
          }
          
          .new-question h2 {
            margin-bottom: 20px;
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
          }
          
          .form-group input, .form-group textarea {
            width: 100%;
            border: 1px solid #d6d9dc;
            border-radius: 3px;
            padding: 8px;
          }
        `}
      </style>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    lineHeight: 1.6,
    color: '#333',
    backgroundColor: '#f6f6f6',
    margin: 0,
    padding: 0
  },
  forumContainer: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px'
  },
  mainContent: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    padding: '20px'
  }
};

export default CommunityForum;