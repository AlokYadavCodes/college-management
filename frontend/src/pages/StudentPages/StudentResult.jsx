function StudentResult() {
    return (
        <div>
            <div className="mt-2 text-center text-xl bg-slate-100 py-1">
                <label htmlFor="semester" className='mr-1'>Select Semester: </label>
                <select id='semester' className='bg-white border border-gray-200 rounded-lg'>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                    <button className='ml-8 bg-blue-600 hover:bg-blue-500 text-white px-2 rounded-lg'>Submit</button>
            </div>

            <div className="my-2 mx-4 px-4 py-2 border flex justify-around ">
                <div className="space-y-2">
                    <div className="flex">
                        <p className="w-36 font-bold">Semester</p>
                        <p>: 4</p>
                    </div>
                    <div className="flex">
                        <p className="w-36 font-bold">Total Subjects</p>
                        <p>: 8</p>
                    </div>
                    <div className="flex">
                        <p className="w-36 font-bold">Result Status</p>
                        <p>: Pass</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex">
                        <p className="w-44 font-bold">Maximum Marks</p>
                        <p>: 400</p>
                    </div>
                    <div className="flex">
                        <p className="w-44 font-bold">Obtained Marks</p>
                        <p>: 899</p>
                    </div>
                    <div className="flex">
                        <p className="w-44 font-bold">Percentage</p>
                        <p>: 93%</p>
                    </div>
                </div>

            </div>


            <div className='mx-4 my-3'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Subject
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Maximum Marks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Obtained Marks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Result
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default StudentResult;