import { prisma } from '../../lib/prisma';
import { App as AppLayout } from '../../components/layouts/App';
import { InferGetServerSidePropsType } from 'next';
import { BinType } from '.prisma/client';

interface BinTypeTableProps {
  binTypes: BinType[];
}

const BinTypeTable = ({ binTypes }: BinTypeTableProps) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Height
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Width
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {binTypes.map(({ id, height, width }, i) => (
                  <tr key={id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{height} Ft.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{width} Ft.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BinTypes({ binTypes }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AppLayout title="Bin Types">
      <>{binTypes.length > 0 ? <BinTypeTable binTypes={binTypes} /> : <h1>No Data</h1>}</>
    </AppLayout>
  );
}

export async function getServerSideProps() {
  const binTypes = await prisma.binType.findMany();
  const count = binTypes.length;

  return { props: { binTypes, count } };
}
