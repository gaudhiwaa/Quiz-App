import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useNavigate } from "react-router-dom";

function SearchQuizPage() {
  const [searchText, setSearchText] = useState('');
  const [quizList, setQuizList] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    const query = searchText.trim().toLowerCase();
    if (!query) return;

    try {
      const quizRef = firebase.database().ref('quizzes');
      const snapshot = await quizRef
        .orderByChild('titleLowercase')
        .startAt(query)
        .endAt(query + '\uf8ff')
        .once('value');

      const quizData = snapshot.val();
      if (!quizData) {
        setQuizList([]);
      } else {
        const quizList = Object.keys(quizData).map((quizId) => {
          return { id: quizId, ...quizData[quizId] };
        });
        setQuizList(quizList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search quizzes by title"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {quizList.length === 0 && (
        <p>No quizzes found with that title.</p>
      )}

      {quizList.length > 0 && (
        <ul>
          {quizList.map((quiz) => (
            <li key={quiz.id}>
              <a href={`/quizzes/${quiz.id}`}>{quiz.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchQuizPage;
