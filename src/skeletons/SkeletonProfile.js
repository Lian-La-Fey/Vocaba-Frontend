import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonProfile = () => {

  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-profile">
        <div>
          <SkeletonElement type="avatar" />
        </div>
        <div>
          <SkeletonElement type="title" />
          <SkeletonElement type="text" />
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonProfile;