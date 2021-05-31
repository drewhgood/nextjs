import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { InferGetServerSidePropsType } from 'next';
import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default function Home({ ids }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(ids);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>All cars</h1>
        <ul>
          {// @ts-ignore
          ids.map(id => {
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
    const posts = (await prisma.car.findMany()) || [];
    const ids = posts.map(({ id }) => id);
    console.log(posts);
    return { props: { ids } };
  } catch {
    return { props: { ids: [] } };
  }
}
