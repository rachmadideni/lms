import Articles from '../features/articles';

export default async function Index() {
  return (
    <>
      <div className="flex flex-row w-full flex-wrap p-8 gap-2 justify-center">
        <Articles />
      </div>
    </>
  );
}
