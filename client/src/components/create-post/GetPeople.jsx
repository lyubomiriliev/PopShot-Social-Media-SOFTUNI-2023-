import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

export default function GetPeople() {


    const [people, setPeople] = useState([]);       // used to store all the docs in the specified collection and update the value of people
    const [newName, setNewName] = useState("");     // controls the inputs target value and sets it as the new value for newName
    const [newAge, setNewAge] = useState(0);        // controls the inputs target value and sets it as the new value for newAge

    const peopleCollection = collection(db, "people"); // Specify which collection

    const createUser = async () => {
        await addDoc(peopleCollection, { name: newName, age: Number(newAge) }); // Add a doc to the specified collection and set new name and age fields.

        setNewName("");
        setNewAge("");
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "people", id);      // updating user age: getting specified doc in db, "people" by id. 
        const newFields = { age: age + 1 };         // Then newFields shows which field and what we update.
        await updateDoc(userDoc, newFields);        // updating the doc(specify which exactly by id, and what we update)
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, "people", id);      // specify which doc in the db and collection by id
        await deleteDoc(userDoc);                   // delete the doc from the specified location
    }

    useEffect(() => { //renders only at the initial render

        const GetPeople = async () => {
            const data = await getDocs(peopleCollection);
            setPeople(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // Get all docs from the specified collection then setPeople = map the docs to doc by id.
        };
        GetPeople(); // call the function

    }, [peopleCollection]);

    return (
        <div>
            <input type="text" placeholder="Name:" value={newName} onChange={(e) => { setNewName(e.target.value) }} />
            <input type="number" placeholder="Age:" value={newAge} onChange={(e) => { setNewAge(e.target.value) }} />
            <button onClick={createUser} >Create User</button>
            {people.map((p) => {
                return (
                    <div key={p.id} >
                        <h1>{p.name}</h1>
                        <h1>{p.age}</h1>
                        <button onClick={() => { updateUser(p.id, p.age) }} >Increase Age</button>
                        <button onClick={() => { deleteUser(p.id) }} > Delete User </button>
                    </div>
                )
            })}
        </div>
    );
};