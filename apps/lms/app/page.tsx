import { Search } from '@final/component';
import Articles from '../features/articles';

export default async function Index() {
  return (
    <>
      <Search
        headerText="sekilas ilmu"
        headerCaption="Temukan artikel menarik yang bakal menambah wawasanmu disini!"
      />
      <div className="flex flex-row w-full flex-wrap p-8 gap-2 justify-center">
        <Articles />
      </div>
    </>
  );
}
