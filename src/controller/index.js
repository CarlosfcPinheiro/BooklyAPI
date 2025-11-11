import { getAllAuthor, getAuthorById, createAuthor, updateAuthorById, deleteAuthorById } from "./author.js";
import { getAllBooks, getBookById, createBook, updateBookById, deleteBookById, getAllBooksByAuthorId, getAllBooksByGenderId} from "./book.js";
import { getAllReviews, getReviewsByBookId, getReviewById, getAvgReviewsByBookId, getReviewsByUserId, createReview, updateReviewById, deleteReviewById 
} from "./review.js";
import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } from "./user.js";
import { getAllGenders,getGenderById,createGender,updateGenderById,deleteGenderById } from '../controller/gender.js';
import { getAllFavorites, getFavoriteById, getAllFavoritesByUserId, createFavorite, deleteFavoriteById, deleteFavoriteByUserAndBook } from "./favorite.js";

const book = {
    getAllBooks, 
    getBookById, 
    createBook, 
    updateBookById, 
    deleteBookById,
    getAllBooksByAuthorId,
    getAllBooksByGenderId
};

const author = {
    getAllAuthor, 
    getAuthorById, 
    createAuthor, 
    updateAuthorById, 
    deleteAuthorById
};

const review = {
    getAllReviews,
    getReviewById,
    getReviewsByBookId,
    getAvgReviewsByBookId,
    getReviewsByUserId,
    createReview,
    updateReviewById,
    deleteReviewById
};

const user = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};

const gender = {
    getAllGenders,
    getGenderById,
    createGender,
    updateGenderById,
    deleteGenderById
};

const favorite = {
    getAllFavorites,
    getFavoriteById,
    getAllFavoritesByUserId,
    createFavorite,
    deleteFavoriteById,
    deleteFavoriteByUserAndBook
};

export { review, book, author, user, gender, favorite };
