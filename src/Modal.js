import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
	const { isModal, closeModal, correct, questions, name } = useGlobalContext();

	let tempPercentage = ((correct / questions.length) * 100).toFixed(0);

	return (
		<div
			className={`${isModal ? "modal-container isOpen" : "modal-container"}`}
		>
			<div className="modal-content">
				<h2>Congrats</h2>
				<p>
					You answered {tempPercentage}% of Questions
					<br />
					{`${
						tempPercentage >= 50
							? `Good Attempt || Nerd ${name}`
							: `Bad Attempt !! Please Study Properly  ${name}`
					} `}
				</p>
				<button className="close-btn" onClick={closeModal}>
					Play Again
				</button>
			</div>
		</div>
	);
};

export default Modal;
