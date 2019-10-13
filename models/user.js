const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {                                             
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 100,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        maxlength: 3,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // restriction of password length cannot be done here, because this refers to what is saved on the user and the hash value has a length > 20
        // maxlength: 20,
        validate(value) {
            if (value.length <= 6) {
                throw new Error('Password must have more than six characters!')
            } else if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    avatarAvailable: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true            
}
)

// creation of a virtual property 
userSchema.virtual('tasks', {
    // 'tasks' is name for virtual field
    // in object individual field is configured
    // 'tasks' not stored on the user -> virtual
    ref: 'Task',
    localField: '_id',
        // where local data is stored, relationship between User and Task
    foreignField: 'owner'
        // name of the field on the task
        // -> find tasks where '_id' (localField) is equal to 'owner' (foreignField)
})

userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()
        // toObject() provided by Mongoogse, gives just raw user data

        // the 'delete' operator deletes a property from an object
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    
    return userObject
}


userSchema.methods.generateAuthToken = async function () {                          // static methods are accessible on the model, methods are accessable on the instances
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)                 
    
    user.tokens = user.tokens.concat({ token })                                     
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

/*During password change. Check if entered old password is correct password*/
userSchema.statics.checkPassword = async (email, oldPassword) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to change password')
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    
    if (!isMatch) {
        throw new Error('Unable to change password')
    }

    return console.log('Old password correct')
    // return user

}

// Hash the plain text password before saving - middleware
userSchema.pre('save', async function (next) {      // two arguments (name of event, fucntion to run), .pre() -> run some code before a user is saved
    const user = this                               // 'user' can be used instead of 'this'
    
    if (user.isModified('password')) {                          // check if password was modified and needs to be hashed 
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()                                          
})     

// Delete user tasks when user is removed - middleware
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User