import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {  InferGetStaticPropsType } from 'next'
import prisma from '../../lib/prisma'

export default function Home({post}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          post && (
            <>
            <h1 className={styles.title}>Post: {post.id}</h1>
            <h3 className={styles.title}>Post: {post.title}</h3>
            </>
          )
}
      </main>
    </div>
  );
}

export const getStaticProps = async ({params}) => {
  const post = await prisma.post.findUnique({ where: { id: Number(params.id) } });
  return { props: { post } }
}

export async function getStaticPaths() {
  const allPosts = await prisma.post.findMany() || [];

  return {
    paths: allPosts.filter(v => v).map(({ id }) => `/posts/${id}`) || [],
    fallback: true,
  };
}