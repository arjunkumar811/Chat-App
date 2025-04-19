import { useAuthStore } from "../store/useAuthStore"

function Navbar() {
  const { authUser } = useAuthStore()
  return (
    <div>
      navbar
    </div>
  )
}

export default Navbar
