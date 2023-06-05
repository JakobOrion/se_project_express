const linkRegex = /(https?:\/\/)(www\.)?\S+/ig;

const checkErrors = ({ res, err }) => {
  if (err.message === 'Not Found') {
    res.status(404).send({ message: 'Requested resource not found' });
  } else if (err.name === ('CastError' || 'ValidationError')) {
    res.status(400).send({ message: 'Data is invalid' });
  } else {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { linkRegex, checkErrors };
