import lit from '../lit_protocol/lit.js';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const noAuthError =
	'The access control condition check failed! You should have at least 0 ETH to decrypt this file.';

export default function Home() {
	const [input, setinput] = useState('');
	const [encryptedText, setEncryptedText] = useState('');
	const [decryptedText, setDecryptedText] = useState('');
	const [enSymmetricKey, setEnSymmetricKey] = useState(null);

	const encryptInput = async () => {
		if (input === '') {
			alert('Please enter some text to encrypt it');
			return;
		}
		const { encryptedString, encryptedSymmetricKey } = await lit.encrypt(input);
		console.log(encryptedSymmetricKey, encryptedString);
		setEnSymmetricKey(encryptedSymmetricKey);
		setEncryptedText(encryptedString);
	};

	const decryptInput = async () => {
		if (encryptedText === '') {
			alert('You have not encrypted any text. Please encrypt some text first.');
			return;
		}
		try {
			const decrypted = await lit.decrypt(encryptedText, enSymmetricKey);
			console.log(decrypted);
		} catch (error) {
			console.log(error);
			alert(noAuthError);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Learning Lit protocol</title>
				<meta name="description" content="learning lit protocol." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title} style={{ color: 'blueviolet' }}>
					String Encrypter and Decrypter
				</h1>

				<p className={styles.description}>
					<input
						type="text"
						id="first_name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Enter some text..."
						required
						value={input}
						onChange={(e) => setinput(e.target.value)}
					/>
				</p>
				<div className="flex">
					<div className="flex-auto w-32 ">
						<button
							type="button"
							className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
							onClick={encryptInput}
						>
							Encrypt{' '}
						</button>
					</div>
					<div className="flex-auto w-32 ">
						<button
							type="button"
							className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
							onClick={decryptInput}
						>
							Decrypt{' '}
						</button>
					</div>
				</div>

				<hr />
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}
