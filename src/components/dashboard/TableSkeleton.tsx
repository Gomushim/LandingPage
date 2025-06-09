export default function TableSkeleton() {
  return (
    <div className="mt-4 animate-pulse">
      {/* 테이블 헤더 스켈레톤 */}
      <div className="mb-4 grid grid-cols-4 gap-4 border-b border-gray-200 pb-4">
        <div className="h-8 rounded-md bg-gray-200" />
        <div className="h-8 rounded-md bg-gray-200" />
        <div className="h-8 rounded-md bg-gray-200" />
        <div className="h-8 rounded-md bg-gray-200" />
      </div>

      {/* 테이블 로우 스켈레톤 */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 border-b border-gray-100 py-3">
          <div className="h-6 rounded-md bg-gray-100" />
          <div className="h-6 rounded-md bg-gray-100" />
          <div className="h-6 rounded-md bg-gray-100" />
          <div className="h-6 rounded-md bg-gray-100" />
        </div>
      ))}

      {/* 페이지네이션 스켈레톤 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-8 w-20 rounded-md bg-gray-200" />
          <div className="h-8 w-20 rounded-md bg-gray-200" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 rounded-md bg-gray-200" />
          <div className="h-8 w-8 rounded-md bg-gray-200" />
          <div className="h-8 w-8 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
