import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (userInput: string) => void;
  onClearSearch: ()=>void
}
const SearchBar = ({ onSubmit, onClearSearch }: SearchBarProps) => {
  const handleForm = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (query.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query.trim());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <div className={styles.formWrapper}>
          <form className={styles.form} action={handleForm}>
            <input
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </form>
          <button type="button" className={styles.button} onClick={onClearSearch}>
            Clear
          </button>
        </div>
      </div>
    </header>
  );
};
export default SearchBar;
