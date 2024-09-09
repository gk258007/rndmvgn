import {  GetStaticProps, InferGetStaticPropsType } from "next";

type Repo = {
  title: string
  stargazer_count:number
}
export const getStaticProps = (async (context) => {
  
  const myHeaders = new Headers();
  const raw=""
  myHeaders.append("Authorization", `Bearer  ${process.env.TMOVEDB_API}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  const res = await fetch('https://api.themoviedb.org/3/account/9583227/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc',requestOptions)
  const repo: Repo = await res.json()
  console.log("The response from the API",repo)
  return{props: {repo}}
}) satisfies GetStaticProps<{
  repo: Repo
}>

export default function Home({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(`Bearer + ${process.env.TMOVEDB_API}`)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">  
        {
          repo.results.map((item) => (
            <div style={{ display: "grid", gridTemplateColumns:200}}>
              {item.original_title}
              <img
                src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
                alt={item.title}
              />
            </div>
          ))
        }
      </main>
    </div>
  );
}
 

