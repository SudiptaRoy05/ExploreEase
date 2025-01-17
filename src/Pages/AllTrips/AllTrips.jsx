
export default function AllTrips() {
    const { data: packages,  refetch } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/package');
            console.log(res.data)
            return res.data;
        },
    });
  return (
    <div>
      
    </div>
  )
}
