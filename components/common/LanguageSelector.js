import styles from './languageselector.module.css'

export default function LanguageSelector({ language, setLanguage, disabled = false }) {
	return (
		<div className={styles.selectWrapper}>
			Language:
			<select
				className={styles.selectBox}
				defaultValue={language}
				onChange={(e) => setLanguage(e.target.value)}
				disabled={disabled}
			>
				<option value='python'>Python</option>
				<option value='cpp'>C++</option>
				<option value='c'>C</option>
				<option value='javascript'>JavaScript</option>
				<option value='typescript'>TypeScript</option>
				<option value='java'>Java</option>
				<option value='sql'>SQL</option>
				<option value='ruby'>Ruby</option>
				<option value='php'>PHP</option>
				<option value='go'>Go</option>
				<option value='rust'>Rust</option>
				<option value='swift'>Swift</option>
				<option value='powershell'>PowerShell</option>
				<option value='perl'>Perl</option>
				<option value='kotlin'>Kotlin</option>
				<option value='json'>JSON</option>
				<option value='xml'>XML</option>
				<option value='markdown'>Markdown</option>
				<option value='yaml'>YAML</option>
				<option value='dockerfile'>Dockerfile</option>
				<option value='shell'>Shell Script</option>
				<option value='html'>HTML</option>
				<option value='css'>CSS</option>
				<option value='r'>R</option>
				<option value='scala'>Scala</option>
				<option value='perl6'>Perl 6</option>
				<option value='groovy'>Groovy</option>
				<option value='lua'>Lua</option>
				<option value='matlab'>Matlab</option>
				<option value='fortran'>Fortran</option>
			</select>
		</div>
	)
}
