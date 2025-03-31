import {Loading, Material} from "../../components/index.js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function StudentMaterial() {
    const [loading, setLoading] = useState(true);
    const [materials, setMaterials] = useState(null);

    const {userId} = useSelector((state) => state.user);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/student/get-materials/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMaterials(data);
            })
            .catch(error => console.log(`error in fetching student materials: ${error}`))
            .finally(() => setLoading(false));
    }, [userId]);
    return (
        loading ? <Loading/> :
            materials.length === 0 ? <div
                    className="mt-4 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                    <h2 className="text-lg font-semibold">No Materials Available</h2>
                    <p className="mt-2 text-sm text-gray-500">It seems that no faculty has uploaded materials yet. Check
                        back later!</p>
                </div>
                :
                <Material materials={materials}/>
    )
}

export default StudentMaterial;