import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
	const {
		quiz,
		handleChange,
		handleSubmit,
		error,
		name,
		setName,
	} = useGlobalContext();

	return (
		<main>
			<section className="quiz quiz-small">
				<form className="setup-form ">
					<div className="form-control">
						{/* no of questions SET */}
						<label htmlFor="name">Enter Your Name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="form-input"
						/>
					</div>
					<div className="form-control">
						{/* no of questions SET */}
						<label htmlFor="amount">Number of questions</label>
						<input
							type="number"
							name="amount"
							id="amount"
							value={quiz.amount}
							onChange={handleChange}
							min={1}
							max={20}
							className="form-input"
						></input>
					</div>
					{/* category  */}

					<div className="form-control">
						<label htmlFor="category">category</label>
						<select
							type="text"
							name="category"
							id="category"
							value={quiz.category}
							onChange={handleChange}
							className="form-input"
						>
							<option value="sports">sports</option>
							<option value="history">history</option>
							<option value="politics">politics</option>
							<option value="Entertainment: Film">Entertainment: Film</option>
						</select>
					</div>

					<div className="form-control">
						<label htmlFor="difficulty">difficulty</label>
						<select
							type="text"
							name="difficulty"
							id="difficulty"
							value={quiz.difficulty}
							onChange={handleChange}
							className="form-input"
						>
							<option value="easy">easy</option>
							<option value="hard">hard</option>
							<option value="medium">medium</option>
						</select>
					</div>
					{error && (
						<p className="error">
							can't generate questions, please try different options
						</p>
					)}
					<button type="submit" onClick={handleSubmit} className="submit-btn">
						Submit
					</button>
				</form>
			</section>
		</main>
	);
};

export default SetupForm;
