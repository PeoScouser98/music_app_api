import { HttpException } from './httpException';

const useCatchAsync = (fn) => (req, res) => {
	try {
		return fn(req, res);
	} catch (error) {
		const httpException = new HttpException(error);
		return res.status(httpException.statusCode).json(httpException.message);
	}
};

export default useCatchAsync;
