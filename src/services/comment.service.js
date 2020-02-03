const BaseService = require('./base.service');
let _commentRepository = null;
let _ideaRepository = null;
class CommentService extends BaseService {
    constructor({ CommentRepository, IdeaRepository }) {
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _commentRepository = IdeaRepository;
    }

    async getIdeaComments(ideaId) {
        if (!ideaId) {
            const error = new Error();
            error.status = 400;
            error.message = 'ideaId most be sent';
            throw error;
        }

        const idea = _ideaRepository.get(ideaId);

        if (!idea) {
            const error = new Error();
            error.status = 400;
            error.message = 'Idea does not exist';
            throw error;
        }

        const { comments } = idea;
        return comments;
    }

    async createComment(comment, ideaId) {
        if (!ideaId) {
            const error = new Error();
            error.status = 400;
            error.message = 'ideaId most be sent';
            throw error;
        }

        const idea = _ideaRepository.get(ideaId);

        if (!idea) {
            const error = new Error();
            error.status = 400;
            error.message = 'Idea does not exist';
            throw error;
        }

        const createComment = await _commentRepository.createComment(comment);
        idea.comments.push(createComment);
        return _ideaRepository.update(ideaId, { comments: idea.comments });
    }
}

module.exports = CommentService;