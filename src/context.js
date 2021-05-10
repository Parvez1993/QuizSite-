import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

//the placement of category in array in the API
const table = {
	sports: 21,
	history: 23,
	politics: 24,
	"Entertainment: Film": 11,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

const tempUrl =
	"https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [index, setIndex] = useState(0);
	const [correct, setCorect] = useState(0);
	const [error, setError] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [quiz, setQuiz] = useState({
		amount: 5,
		category: "sports",
		difficulty: "medium",
	});

	const [name, setName] = useState("User420");

	//---------------

	const fetchQuestions = async (url) => {
		setLoading(true);
		setWaiting(false);

		const response = await axios(url).catch((error) => console.error(error));
		console.log(response);
		if (response) {
			const data = response.data.results;
			// console.log(data);
			if (data.length > 0) {
				setQuestions(data);
				setLoading(false);
				setWaiting(false);
				setError(false);
			} else {
				setWaiting(true); //waiting true display form
				setError(true);
			}
		} else {
			setWaiting(true);
		}
	};

	const nextQuestion = () => {
		setIndex((nextPage) => {
			const index = nextPage + 1;
			if (index > questions.length - 1) {
				openModal();
				return 0;
			} else {
				return index;
			}
		});
	};

	const checkAnswer = (value) => {
		if (value) {
			setCorect((score) => {
				return score + 1;
			});
		}
		nextQuestion();
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
		setCorect(0);
		setIsModal(false);
	};
	// useEffect(() => {
	// 	fetchQuestions(tempUrl);
	// }, []);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setQuiz({ ...quiz, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { amount, category, difficulty } = quiz;
		const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficult=${difficulty}&type=multiple`;

		fetchQuestions(url);
	};
	return (
		<AppContext.Provider
			value={{
				waiting,
				loading,
				questions,
				index,
				correct,
				error,
				isModal,
				nextQuestion,
				checkAnswer,
				closeModal,
				quiz,
				handleChange,
				handleSubmit,
				name,
				setName,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
