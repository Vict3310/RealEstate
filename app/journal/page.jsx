import { getArticles } from "../../lib/actions";
import JournalClient from "./JournalClient";

export const metadata = {
  title: 'The Journal | Obsidian',
  description: 'Editorial insights on luxury living, architectural trends, and high-end market analysis.',
};

export default async function JournalPage() {
  const articles = await getArticles();
  
  return <JournalClient initialArticles={articles} />;
}
