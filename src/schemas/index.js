import * as yup from 'yup'
// validation for input field 
export const signUpSchema = yup.object({
    Create_Group: yup.string().min(5, 'Group Name must have at least 5 characters').max(20, 'Group Name must be less than 20 characters').required("*Group Name Required*"),

    description: yup.string().min(15, 'Description must have at least 15 characters').max(300, 'Description must be less than 300 characters').required("*Description Required*"),

    term: yup.array(
        yup.object({
            Enter_Term: yup.string().min(5, 'Term must have at least 5 characters').max(20, 'Term must be less than 20 characters').required("*Term Required*"),
            Enter_Definition: yup.string().min(10, 'Definition must have at least 10 characters').max(300, 'Definition must be less than 300 characters').required("*Definition Required*"),
        })
    ),
});