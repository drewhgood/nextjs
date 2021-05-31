import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { InferGetServerSidePropsType } from 'next';
import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default function Home({ postIds }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (

                   <div className={styles.container}>
                     <Head>
                       <title>Create Next App</title>
                       <link rel="icon" href="/favicon.ico" />
                     </Head>

                     <main className={styles.main}>
                       <h1>All Posts</h1>
                       <ul>
                         {
                           // @ts-ignore
                         postIds.map((id) => {
                           return (
                             <li>
                               <Link href={`/posts/${id}`}>
                                 <a>{`Post: ${id}`}</a>
                               </Link>
                             </li>
                           );
                         })}
                       </ul>
                     </main>
                   </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const posts = (await prisma.post.findMany()) || [];
    const postIds = posts.map(({ id }) => id);

    return { props: { postIds } };
  } catch {
    return { props: { postIds: [] } };
  }
}
